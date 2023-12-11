PROMPT_1 = """Extract the following information from the given resume 
    {resume} and provide me as a json , and if a field doesnot have information set it to null:
    1. Contact Information
    2. Professional Summary/Objective
    3. Skills
    4. Work Experience
    5. Education
    6. Certifications
    7. Projects
    8. Awards and Honors
    9. Extracurricular Activities
    10. Languages
    11. Professional Memberships
    12. Volunteer Work
"""
PROMPT_2 = """You are given resume : ```{resume}```

then based on the given resume extract information about the person 
    
the output should be markdown code snippet formated in the following schema, including the leading and trailing "\`\`\`json" and "\`\`\`"
    
```json

{
    "Contact Information":{
        "Name":string // name of the person
        "Email":string // email of the person
        "Contact":string // contact number of the person
        "Links":array // link of social profiles
        },
    "About Me":string //about the person
    "Skills":array // skills of the person
    "Work Experience":{
        "title":string // title of position working
        "company":string // company name he is working
        "duration":string // duration of working in the company 
    }
    "Education":{
        "course":string // name of the course
        "branch":string // name of the branch he is studying
        "institute":string // name of the institute
    },
    "Certificates":array // certificate name he has acquired
    "Projects":{
        "name":string // name of the project
        "description":string // description about the project
        "link"string // link to its project
    }
    "Achievement":array // rewards ,honours etc. recieved
    "Volunteer":array // volunteering work done
        
}  ```
"""
PROMPT_3="""
You are given resume : ```{resume}```

then based on the given resume extract information about the person 
and provide me as a json output , and if a field doesnot have information set it to null:
    
Contact Information:
- Name: String (required)
- Email: String (required)
- Contact: String (required)
- Links: Array of Strings

About Me: String

Skills: Array of Strings

Work Experience:
- Title: String
- Company: String
- Duration: String

Education:
- Course: String
- Branch: String
- Institute: String

Certificates: Array of Strings

Projects:
- Name: String
- Description: String
- Link: String

Achievements: Array of Strings

Volunteer: Array of Strings

"""

PROMPT_4="""
You are given resume : ```{resume}```

then based on the given resume extract information about the person 

{format_instructions}

"""