# SETUP 
### After Cloning

# SETUP FOR BACKEND

## use python3.10.x and virtual env
```
cd llm_resume_parser/backend
mkdir uploads parsed_resume
python -m venv .venv

```
## Activate the virtual env
```
pip install -r requirements.txt
uvicorn main:app --reload

```


# SETUP FOR FRONTEND

```
cd llm_resume_parser/frontend
npm ci
npm run dev

```