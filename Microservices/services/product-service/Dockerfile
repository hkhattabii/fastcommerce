FROM python:alpine3.7
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5005
CMD ["python", "app.py"]