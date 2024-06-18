# Dockerfile

# Node.js 18 버전을 기반 이미지로 사용
FROM node:18

# /app 디렉토리를 생성
RUN mkdir -p /app

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 현재 디렉토리의 모든 파일을 컨테이너의 /app/ 디렉토리에 복사
ADD . /app/

# 기존의 yarn.lock 및 package-lock.json 파일이 있으면 삭제
# 이는 종속성 관리를 위한 것으로, 최신 버전의 종속성을 설치하기 위함
RUN rm yarn.lock || true
RUN rm package-lock.json || true

# yarn을 사용하여 종속성 설치
RUN yarn

# 애플리케이션 빌드
RUN yarn build

# 호스트 주소를 0.0.0.0으로 설정 (모든 네트워크 인터페이스에서 애플리케이션에 접근 가능하게 함)
ENV HOST 0.0.0.0

# 3000번 포트를 컨테이너 외부에 노출
EXPOSE 8080

# 컨테이너가 시작될 때 실행할 명령어 설정
CMD [ "yarn", "start"]