FROM python:3.11-slim-bullseye
WORKDIR /app
COPY Reqt.txt .
RUN pip install --no-cache-dir -r Reqt.txt

COPY . /app
EXPOSE 3000
CMD ["python3","FlaskTst.py"]