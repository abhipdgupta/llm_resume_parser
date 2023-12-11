# SETUP 
```
git clone https://github.com/abhipdgupta/llm_resume_parser.git
```

# SETUP FOR BACKEND

## use python3.10.x and virtual env

### OPENAI_API_KEY={your openai api key}

```
cd llm_resume_parser/backend
touch .env
mkdir uploads parsed_resume
python -m venv .venv

```
## Activate the virtual env
```
pip install -r requirements.txt
uvicorn main:app --reload

```


# SETUP FOR FRONTEND

### VITE_API_URL={your backend url eg: http://localhost:8000}
```
cd llm_resume_parser/frontend
touch .env
npm ci
npm run dev

```