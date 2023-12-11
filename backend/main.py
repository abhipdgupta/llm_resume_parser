from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import ExtractInformationFromResume, PdfToText
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):

    try:
        if not file.filename.lower().endswith(".pdf"):
             return JSONResponse(
                status_code=400,
                content={
                    "error_type": "Bad Request",
                    "message": "Only pdfs are alloweded",
                },
            )
            
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(file.file.read())

        # Extract information from the resume

        extracted_text = PdfToText(file_path)
        # print("Text content from PDF:", extracted_text)

        information = ExtractInformationFromResume(extracted_text)
        # print(information)
                
        with open(f"parsed_resume/{file.filename.split('.')[0]}.json", "w") as f:
            f.write(information)

       

        response = {"filename": file.filename, "information": json.loads(information)}
        return JSONResponse(status_code=200, content=response)

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail={"error_type": "ProcessingError", "message": str(e)}
        )


@app.get("/test/")
async def test():
    return {"success": "ok"}
