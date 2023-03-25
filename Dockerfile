FROM node:18.15.0-alpine
RUN mkdir /iroha_front
WORKDIR /iroha_front
COPY . /iroha_front

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
