import time
from fastapi import Request

async def logging_middleware(request: Request, call_next):
    start_time = time.time()

    response = await call_next(request)

    process_time = (time.time() - start_time) * 1000

    print(
        f"{request.method} {request.url.path} "
        f"- {response.status_code} "
        f"- {process_time:.2f}ms"
    )

    return response
