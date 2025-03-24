from fastapi import FastAPI, File, UploadFile
import shutil
import os
import pdfplumber
import openai
import json
import requests
import json
from pydantic import BaseModel
from dotenv import load_dotenv

NODE_SERVER_URL = "http://localhost:5000/api/process_cv"
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

def extract_text_from_pdf(pdf_path):
    """Extract text from the PDF file."""
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    return text


def get_project_title_from_text(text):
    """Use OpenAI to extract the project title explicitly mentioned in the proposal."""
    prompt = (
        "Extract the title of the project from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Project Title' or an introductory statement. "
        "If a clear project title is found, return only the title without any extra text. "
        "If no project title is explicitly mentioned, return exactly: 'No project title is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    project_title = response.choices[0].message.content.strip()

    # Handle cases where no project title is found
    if not project_title or project_title.lower() == "no project title is mentioned in this proposal.":
        return "No project title is mentioned in this proposal."

    return project_title


def get_technologies_tools_from_text(text):
    """Use OpenAI to extract the technologies and tools explicitly mentioned in the proposal."""
    prompt = (
        "Extract the technologies and tools used in the project from the following project proposal text. "
        "Ensure they are taken from a relevant section such as 'Technologies Used', 'Tools & Technologies', or similar. "
        "If multiple technologies and tools are mentioned, return them as a comma-separated list. "
        "If no technologies or tools are explicitly mentioned, return exactly: 'No technologies or tools are mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    technologies_tools = response.choices[0].message.content.strip()

    # Handle cases where no technologies or tools are found
    if not technologies_tools or technologies_tools.lower() == "no technologies or tools are mentioned in this proposal.":
        return "No technologies or tools are mentioned in this proposal."

    return technologies_tools

def get_target_audience_from_text(text):
    """Use OpenAI to extract the target audience explicitly mentioned in the proposal."""
    prompt = (
        "Extract the target audience from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Target Audience', 'Intended Users', or a similar heading. "
        "If multiple audiences are mentioned, return them as a comma-separated list. "
        "If no target audience is explicitly mentioned, return exactly: 'No target audience is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    target_audience = response.choices[0].message.content.strip()

    # Handle cases where no target audience is found
    if not target_audience or target_audience.lower() == "no target audience is mentioned in this proposal.":
        return "No target audience is mentioned in this proposal."

    return target_audience


def get_project_objective_from_text(text):
    """Use OpenAI to extract the project objective explicitly mentioned in the proposal."""
    prompt = (
        "Extract the project objective from the following project proposal text. "
        "The objective might not be explicitly titled as 'Project Objective'. "
        "Look for sentences that describe the purpose, aim, or goal of the project. "
        "If no objective is explicitly mentioned, return 'No project objective is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    project_objective = response.choices[0].message.content.strip()

    # Handle cases where no project objective is found
    if not project_objective or project_objective.lower() == "no project objective is mentioned in this proposal.":
        return "No project objective is mentioned in this proposal."

    return project_objective

def get_proposed_solution_summary_from_text(text):
    """Use OpenAI to extract the proposed solution summary explicitly mentioned in the proposal."""
    prompt = (
        "Extract the proposed solution summary from the following project proposal text. "
        "Ensure it is taken from a relevant section such as 'Proposed Solution', 'Solution Overview', or similar. "
        "If a clear proposed solution summary is found, return only the summary without any extra text. "
        "If no proposed solution is explicitly mentioned, return exactly: 'No proposed solution is mentioned in this proposal.'\n\n"
        f"Project Proposal Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5-turbo
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    proposed_solution_summary = response.choices[0].message.content.strip()

    # Handle cases where no proposed solution is found
    if not proposed_solution_summary or proposed_solution_summary.lower() == "no proposed solution is mentioned in this proposal.":
        return "No proposed solution is mentioned in this proposal."

    return proposed_solution_summary



def get_name_from_text(text):
    """Use OpenAI to extract the name only if explicitly mentioned in the CV."""
    prompt = (
        "Extract the full name from the following CV text, ensuring it is taken from a relevant section such as 'Name' or 'Personal Information'. "
        "If a full name is found, return only the name without any extra text. "
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5 model
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    name = response.choices[0].message.content.strip()

    # Handle cases where no name is found
    if not name or name.lower() == "no name is mentioned in this cv.":
        return "No name is mentioned in this CV."
    return name

def get_technical_skills_from_text(text):
    """Use OpenAI to extract technical skills only from the 'Technical Skills' section in the given text."""
    prompt = (
        "Extract only the technical skills listed under the 'Technical Skills' section "
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    technical_skills = response.choices[0].message.content.strip()

    # Handle cases where no skills are found
    if not technical_skills or technical_skills.lower() == "no technical skills are mentioned in this cv.":
        return "No technical skills are mentioned in this CV."

    return technical_skills

def get_soft_skills_from_text(text):
    """Use OpenAI to extract soft skills from the CV."""
    prompt = (
        "Extract only the soft skills listed in the following CV text. "
        "If soft skills are explicitly mentioned under a section like 'Soft Skills' or similar, return them as a comma-separated list. "
        "If no soft skills section exists, analyze the text and infer common soft skills based on the content. "
        "If no soft skills can be identified, return exactly: 'No soft skills are mentioned in this CV.'\n\n"
        f"CV Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    # Request completion from GPT-3.5 model
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    soft_skills = response.choices[0].message.content.strip()

    # Handle cases where no soft skills are found
    if not soft_skills or soft_skills.lower() == "no soft skills are mentioned in this cv.":
        return "No soft skills are mentioned in this CV."

    return soft_skills



def get_projects_from_text(text):
    """Use OpenAI to extract projects only from the 'Projects' section in the given text."""
    prompt = (
        "Extract only the projects listed under the 'Projects' section in the following CV text. "
        "If the section exists, return a list of projects, formatted as a brief title followed by a short description. "
        "If there is no 'Projects' section, return exactly: 'No projects are mentioned in this CV.'\n\n"
        f"CV Text:\n{text}"
    )


    client = openai.OpenAI(api_key=OPENAI_API_KEY)


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    projects = response.choices[0].message.content.strip()

    # Handle cases where no projects are found
    if not projects or projects.lower() == "no projects are mentioned in this cv.":
        return "No projects are mentioned in this CV."

    return projects


def get_career_objectives_from_text(text):
    """Use OpenAI to extract career objectives from the CV."""
    prompt = (
        "Extract the career objective or aspirations from the given CV text. "
        "If there is no explicit 'Career Objective' section, infer the candidate's aspirations based on the provided text. "
        "Provide only the key objective, avoiding unnecessary details.\n\n"
        f"CV Text:\n{text}"
    )

    client = openai.OpenAI(api_key=OPENAI_API_KEY)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    career_objective = response.choices[0].message.content.strip()

    # Handle cases where no career objective is found
    if not career_objective or "no career objective" in career_objective.lower():
        return "No career objective is mentioned in this CV."

    return career_objective






@app.post("/upload_project")
async def upload_pdf(proposal: UploadFile = File(...)):



    # Extract text using the given function
    extracted_text = extract_text_from_pdf(proposal.file)
    title=get_project_title_from_text(extracted_text)
    project_object=get_project_objective_from_text(extracted_text)
    project_proposal_solution=get_proposed_solution_summary_from_text(extracted_text)
    technologies_tools=get_technologies_tools_from_text(extracted_text)
    target_audience=get_target_audience_from_text(extracted_text)


    print("01. Extracted Name:", title)
    print("02. Project objective:",project_object)
    print("03.  project_proposal_solution:",project_proposal_solution)
    print("04.  technologies_tools:", technologies_tools)
    print("05. Target Audience:", target_audience)

    proposal_data= {
        "name":title,
        "skills":project_object,
        "projects":project_proposal_solution,
        "Soft skills":target_audience,
    }
    items1 = [{
        "name": title,
        "skills": project_object,
        "projects": project_proposal_solution,
        "Soft skills": target_audience,
    }

    ]

    @app.get("/items1/")
    def get_items():
        return items1

    file_name = "Propsal-dictionary.json"

    # Write the dictionary to a JSON file
    with open(file_name, 'w') as json_file:
        json.dump(proposal_data, json_file, indent=4)

    print("Data successfully written to", file_name)




@app.post("/upload_cv")
async def upload_proposal(cv: UploadFile = File(...)):
    extracted_text = extract_text_from_pdf(cv.file)
    name = get_name_from_text(extracted_text)
    soft_skills = get_soft_skills_from_text(extracted_text)
    Technical_skills= get_technical_skills_from_text(extracted_text)
    projects=get_projects_from_text(extracted_text)
    objective=get_career_objectives_from_text(extracted_text)

    print(" Extracted Name:", name)
    print(" Extracted Soft Skills:", soft_skills)
    print(" Extracted Technical Skills:",Technical_skills)
    print("Extracted  projects:",projects)
    print("Object:", objective)


    cv_data = {
        "name":name,
        "technical_skills":Technical_skills,
        "soft_skills":soft_skills,
        "projects":projects,
        "career_objective": objective
    }

    items1 = [{
        "name": name,
        "technical_skills": Technical_skills,
        "soft_skills": soft_skills,
        "projects": projects,
        "career_objective": objective
    }

    ]



    @app.get("/items1/")
    def get_items():
        return items1


    file_name = "CVdictionary.json"

    with open(file_name, 'w') as json_file:
        json.dump(cv_data, json_file, indent=4)

    print("Data successfully written to", file_name)



# async def startup_logic():
#     try:
#         file_name = "CVdictionary.json"
#         with open(file_name, 'r') as json_file:
#             data = json.load(json_file)

#         response = requests.post(NODE_SERVER_URL, json=data)

#         if response.status_code == 200:
#             print("Done")
#             print(response.json())
            
#         else:
#             print({"error": "Failed to send data", "status_code": response.status_code})
#     except Exception as e:
#         print({"error": str(e)})

# @app.on_event("startup")
# async def startup_event():
#     await startup_logic()
@app.post("/process_cv/")
async def upload_cv():
    try:
        file_name = "CVdictionary.json"
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)

        response = requests.post(NODE_SERVER_URL, json=data)

        if response.status_code == 200:
            node_response = response.json()
            print(response.json())
            return {"response": node_response["response"]}
        else:
            return {"error": "Failed to send data", "status_code": response.status_code}

        
        
    
        
    
       
    except Exception as e:
        return {"error":str(e)}



