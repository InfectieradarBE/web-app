# build environment
FROM node:15.6.0 as build
WORKDIR /app
COPY . .
ENV REACT_APP_DEFAULT_INSTANCE=belgium
ENV REACT_APP_API_BASE_URL=/api
ENV REACT_APP_DEFAULT_LANGUAGE=nl-be
ENV REACT_APP_FALLBACK_LANGUAGE=nl-be
ENV REACT_APP_CONTENT_URL="/belgium"
ENV REACT_APP_USE_RECAPTCHA=true
ENV REACT_APP_RECAPTCHA_SITEKEY=6LdP02caAAAAAEKYgQSfS8LvSHH8mmUIYgDc9rdJ
ENV REACT_APP_TITLE=Infectieradar.be
ENV REACT_APP_DESCRIPTION="Een onderzoek in de strijd tegen epidemieën"
ENV REACT_APP_CSP_DEFAULT_SRC="'self'"
ENV REACT_APP_CSP_MEDIA_SRC="'self' https://infectieradar.be/wp-content/"
ENV REACT_APP_CSP_IMG_SRC="'self' data: https:"
ENV REACT_APP_CSP_STYLE_SRC="'unsafe-inline' 'self' https://www.gstatic.com/recaptcha/ https://www.google.com/recaptcha/ "
ENV REACT_APP_CSP_SCRIPT_SRC="'unsafe-inline' https://www.gstatic.com/recaptcha/ https://www.google.com/recaptcha/ 'self' 'unsafe-eval'"
ENV REACT_APP_CSP_FRAME_SRC="https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha"
ENV REACT_APP_CSP_CHILD_SRC="https://www.google.com/"
ENV REACT_APP_CSP_CONNECT_URLS="http://survey.infectieradar.be https://survey.infectieradar.be ws://survey.infectieradar.be// ws://survey.infectieradar.be/ https://www.google.com/recaptcha/ https://www.google.com/ http://www.w3.org/2000/svg"
RUN yarn
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]
