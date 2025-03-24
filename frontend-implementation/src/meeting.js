import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';

const MeetingPage = () => {
    const navigation = useNavigate();
    const socketRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const recordedChunksRef = useRef([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [audioSrc, setAudioSrc] = useState(null);
    
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    
    // Speech-to-text states
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [transcriptionInterval, setTranscriptionInterval] = useState(null);

    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true, audio: true });


    const [userInput, setUserInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    // const [messages, setMessages] = useState([]);

    const [firstAiResponse, setFirstAiResponse] = useState("");
    const [isFirstResponse, setIsFirstResponse] = useState(false);
    const [interview, setInterview] = useState(null);
    const [cvId, setCvId] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [response, setResponse] = useState(null);
    const [interviewText, setInterviewText] = useState('');

    useEffect(() => {
        const initializeSocket = () => {
            socketRef.current = io();
            socketRef.current.on('connect', () => {
                console.log('Connected to server');
                socketRef.current.emit("join-room", "someRoomId", "someUserId");
            });
            socketRef.current.on('disconnect', () => console.log('Disconnected from server'));
        };

        initializeSocket();

        return () => {
            stopAllTracks();
            stopTranscription();
            
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Disconnected from server');
            }
        };
    }, []);

    useEffect(() => {
        if (isVideoOn) {
            initializeCamera();
        } else {
            stopAllTracks();
        }
    }, [isVideoOn]);
    
    const initializeCamera = async () => {
        try {
            let stream = null;
            
            if (!isVideoOn) {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: isAudioOn 
                });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: isAudioOn 
                });
            }
            
            setLocalStream(stream);
            
            if (socketRef.current) {
                setupWebRTC(stream);
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };
    
    const setupWebRTC = (stream) => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        setPeerConnection(pc);
        peerConnectionRef.current = pc;
        
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        
        pc.ontrack = event => {
            setRemoteStream(event.streams[0]);
        };
        
        pc.onicecandidate = event => {
            if (event.candidate && socketRef.current) {
                socketRef.current.emit("candidate", event.candidate);
            }
        };
    };
    
    const stopAllTracks = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
            });
            setLocalStream(null);
        }
    };
    
    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
        
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.stop();
            });
        }
        
        // If audio is turned off, stop transcription
        if (isAudioOn && isTranscribing) {
            stopTranscription();
        }
    };

    const endCall = () => {
        stopAllTracks();
        stopTranscription();
        
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }
        
        if (socketRef.current) {
            socketRef.current.emit("leave-room");
            socketRef.current.disconnect();
        }
        
        navigation('/feedback');
    };

    const handleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    };

    const toggleFullScreenRecording = async () => { 
        if (isRecording) {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
            setIsRecording(false);
        } else {
            try {
                // Capture the entire screen for recording only (not sharing)
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: { mediaSource: "screen" }, // Captures full screen
                    audio: true // Captures system audio
                });
    
                mediaRecorderRef.current = new MediaRecorder(screenStream);
                recordedChunksRef.current = [];
    
                mediaRecorderRef.current.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunksRef.current.push(event.data);
                    }
                };
    
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'full-screen-recording.webm';
                    a.click();
                };
    
                mediaRecorderRef.current.start();
                setIsRecording(true);
    
                // Stop recording if the user closes the screen capture
                screenStream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
                        mediaRecorderRef.current.stop();
                        setIsRecording(false);
                    }
                };
            } catch (error) {
                console.error("Error starting full-screen recording:", error);
            }
        }
    };
    
    // Speech-to-text functionality
    const startTranscription = async () => {
        if (!isTranscribing && isAudioOn) {
            try {
                // Get audio stream for transcription
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Set up audio recorder with the stream
                const audioRecorder = new MediaRecorder(audioStream);
                audioChunksRef.current = [];
                
                audioRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };
                
                audioRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    await sendAudioToWhisper(audioBlob);
                    
                    // If still transcribing, restart recording
                    if (isTranscribing) {
                        audioChunksRef.current = [];
                        audioRecorder.start(5000); // Record in 5-second chunks
                    }
                };
                
                // Start recording audio in chunks
                audioRecorder.start(5000);
                
                mediaRecorderRef.current = audioRecorder;
                setIsTranscribing(true);
                
            } catch (error) {
                console.error("Error starting transcription:", error);
                setIsTranscribing(false);
            }
        }
    };
    
    const stopTranscription = () => {
        if (isTranscribing) {
            // Stop audio recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            
            // Reset state
            setIsTranscribing(false);
        }
    };
    
    const sendAudioToWhisper = async (audioBlob) => {
        try {
            // Create form data for the API request
            const formData = new FormData();
            formData.append('file', audioBlob);
            formData.append('model', 'whisper-1');
            
            // Set your OpenAI API key in environment variables for security
            const apiKey = "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";
            
            // Send the audio to OpenAI Whisper API
            const response = await fetch(
                'https://api.openai.com/v1/audio/transcriptions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    },
                    body: formData
                }
            );
            
            const data = await response.json();
            console.log("Transcription result:", data);
            console.log("Transcription result data:", data.text);
            sendMessage(data.text);
            // Process the transcription result
            if (data && data.text) {
                const newText = data.text.trim();
                if (newText) {
                    setTranscript(prev => prev + ' ' + newText);
                    
                    // Optionally send transcript to server via socket
                    if (socketRef.current) {
                        socketRef.current.emit("transcript-update", newText);
                        console.log("Transcript sent to server:", newText);
                    }
                }
            }
        } catch (error) {
            console.error("Error with Whisper API:", error);
        }
    };
    const synthesizeSpeech = async (text) => {
        try {
          const response = await axios.post("http://localhost:5000/api/voice", {
            text,
          });
          console.log("Response from TTS API:", response.data);
          if (!response.data.audioContent) {
            console.error("No audio content received");
            return;
          }
          const audio_Src = `data:audio/mp3;base64,${response.data.audioContent}`;
          console.log("Audio source before setting:", audio_Src);
          setAudioSrc(audio_Src);
          console.log("Audio source after setting:", audioSrc);
          return audio_Src;
        } catch (error) {
          console.error("Error synthesizing speech:", error); // Log errors
        }
    };
    const getFeedback = async (aiResponse, userInput) => {
        try {
            const response = await axios.post("http://localhost:5000/api/feedback", {aiResponse, userInput});
            console.log("Feedback response:", response.data);
            setFeedback((preFeedback) => [...preFeedback, response.data]);
            console.log(feedback)
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    }


    const sendMessage = async (userInput) => {
        if (!userInput.trim()) return;
    
        const newMessage = { sender: "User", text: userInput };
        // setMessages((prev) => [...prev, newMessage]);
        // setUserInput("");
    
        try {
            // Send the message to your backend API
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage: userInput }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            // Parse the response from the backend
            const data = await response.json();
            console.log(data);
    
            // Update the AI's response state
            setAiResponse(data.response);
            // setMessages((prev) => [...prev, { sender: "AI", text: data.response }]);
    
            // Log the current messages (optional for debugging)
            // console.log(messages);
    
            // Call the synthesizeSpeech function to send the message to Wavenet or any other TTS system
            console.log("AI Response after synthesis:", data.response);
            const res=await synthesizeSpeech(data.response);
            console.log("my new", res);
            getFeedback(aiResponse, userInput);


            const audio = new Audio(res);
            // audio.loop = true;
            audio.play().catch((error) => console.error("Error playing audio:", error));
    
        } catch (error) {
            console.error("Error in chat session:", error);
        }
    };
    const processCV = async () => {
        try {
           
            console.log("🚀 Starting processCV function...");
            
            // Call FastAPI to start the process
            const response = await axios.post("http://localhost:8000/process_cv");

            console.log("✅ AI Response Received:", response.data);
            
            // Set response to state
            setAiResponse(response.data.response);

            // Call the text-to-speech function to play the response
            const audioSrc = await synthesizeSpeech(response.data.response);
            if (audioSrc) {
                const audio = new Audio(audioSrc);
                audio.play().catch((error) => console.error("Error playing audio:", error));
            }
        } catch (error) {
            console.error("❌ Error processing CV:", error);
        }
    };

    // const startInterview = async () => {
    //     try{
    //         const {data} = await axios.get("http://localhost:5000/api/first_resp");
            
    //         const res=await synthesizeSpeech(data.response);
    //         console.log("my new", res);
    //         getFeedback(aiResponse, userInput);


    //         const audio = new Audio(res);
    //         // audio.loop = true;
    //         audio.play().catch((error) => console.error("Error playing audio:", error));
    //         console.log("Response from server:", data.response);
    //     }catch(error){
    //         console.error("Error in startInterview:", error);
    //     }
        
    // }
    // // Toggle transcription with a single button
    const toggleTranscription = () => {
        if (isTranscribing) {
            stopTranscription();
        } else {
            startTranscription();
        }
    };
   
  

    return (
        <div className='meeting-container'>
            <div className="video-wrapper relative"> 
                {isVideoOn ? (
                    <Webcam 
                        ref={webcamRef} 
                        audio={isAudioOn} 
                        muted={true} // Always mute the local preview to prevent feedback
                        style={{ width: '100%' }}
                    />
                ) : (
                    <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: '#333', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        color: 'white'
                    }}>
                        Camera Off
                    </div>
                )}
                
                {/* Recording indicator */}
                {isRecording && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(255, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s infinite'
                        }}></div>
                        Recording
                    </div>
                )}

                {/* Add CSS for the pulsing animation */}
                <style>
                    {`
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                    
                    .relative {
                        position: relative;
                    }
                    `}
                </style>
            </div>
            <div className="video-wrapper relative">
                <img src="./avatar-meeting.png" alt="Avatar"/>
                
                {/* Recording indicator also on the second video */}
                {isRecording && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(255, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s infinite'
                        }}></div>
                        Recording
                    </div>
                )}
            </div>
            <div >
        <h1>Meeting Page</h1>
        {cvId ? <p>Interview ID: {response}</p> : <p>Loading...</p>}
        <button onClick={processCV}>Start Interview</button>
        </div>
          
            
                        
            <div className="controls">
                <button onClick={toggleVideo} style={{ backgroundColor: isVideoOn ? 'rgba(255, 0, 0, 0.7)' : 'black' }} > 
                    <i className={`fa-solid ${isVideoOn ? "fa-video" : "fa-video-slash"}`}></i> {isVideoOn ? " Turn Off Video" : " Turn On Video"} 
                </button>
                <button 
                    onClick={toggleTranscription}
                    style={{ backgroundColor: isTranscribing ? 'rgba(255, 0, 0, 0.7)' : 'black' }}
                    disabled={!isAudioOn}
                >
                    <i className={`fa-solid ${isTranscribing ? "fa-stop" : "fa-microphone-lines"}`}></i> 
                    {isTranscribing ? " Stop Transcribing" : " Transcribe"}
                </button>
                <button 
                    onClick={toggleFullScreenRecording} 
                    style={{ 
                        backgroundColor: isRecording ? 'red' : 'black',
                        animation: isRecording ? 'pulse 1.5s infinite' : 'none'
                    }}
                >
                    <i className={`fa-solid ${isRecording ? "fa-square" : "fa-circle"}`}></i> 
                    {isRecording ? " Stop Recording" : " Start Recording"}
                </button>
                <button 
                    onClick={endCall} 
                    style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }}
                >
                    <i className="fa-solid fa-phone-slash"></i> End
                </button>
            </div>
        </div>
    );
};

export default MeetingPage;
