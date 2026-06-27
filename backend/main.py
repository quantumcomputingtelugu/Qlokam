from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import io
import contextlib
import traceback

app = FastAPI(title="Qlokam Execution Backend")

# Allow CORS for local development from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str
    language: str # 'qiskit' or 'cirq'

@app.get("/")
def read_root():
    return {"status": "Qlokam Execution Engine is running."}

@app.post("/execute")
def execute_code(request: CodeExecutionRequest):
    # WARNING: This is a highly insecure way to run code, intended only as a basic starting point for the project. 
    # In a real environment, this must be isolated in a Docker container or Firecracker microVM.
    
    code = request.code
    language = request.language
    
    if language not in ['qiskit', 'cirq']:
        raise HTTPException(status_code=400, detail="Unsupported language")
    
    # Capture standard output
    output_buffer = io.StringIO()
    try:
        with contextlib.redirect_stdout(output_buffer):
            # Execute the code in a restricted scope if possible, but here we just use exec
            exec(code, {"__builtins__": __builtins__})
    except Exception as e:
        error_msg = traceback.format_exc()
        return {"success": False, "error": str(e), "traceback": error_msg}
        
    return {"success": True, "output": output_buffer.getvalue()}
