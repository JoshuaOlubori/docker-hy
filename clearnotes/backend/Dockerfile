FROM ubuntu:22.04
# install pip
RUN apt update && apt install -y python3-pip
WORKDIR /usr/src/app
COPY . . 
RUN pip3 install -r requirements.txt
EXPOSE 8000
CMD ["python3", "main.py"]