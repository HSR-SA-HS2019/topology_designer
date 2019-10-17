# topology-designer backend
# Version: 1.0
FROM python:2.7
# Install Python and Package Libraries

# Project Files and Settings
FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD backend/src/requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
