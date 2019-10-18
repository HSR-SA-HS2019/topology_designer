# topology-designer backend
# Version: 1.0
FROM django
# Install Python and Package Libraries

# Project Files and Settings
RUN mkdir /code
WORKDIR /code
ADD backend/src/requirements.txt /code/

RUN pip install -r requirements.txt

ADD backend /code/

# Expose the application on port 8000
EXPOSE 8000
# Run test server
CMD ["python", "backend/src/manage.py", "runserver", "0.0.0.0:8000"]
