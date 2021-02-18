The Api built on Docker Platform so to run at local you should have docker & docker-compose installed on your system.
rename .env.example file to .env then

For the build you should run
```
docker-compose build
```
After the build completed you can run
```
docker-compose up
```
Your api should be accessible at http://localhost:80
Local level nodemon will watch you changes & transfer them to working code.

For the multi thread local production build you should change the `target` section to `prod` at `docker-compose` file
After changing it you should run `build` & `up` commands again.

If you want the API should work with your local db just change the ENV settings & rerun project. `Sequelize ORM`
will take care of the rest according to config.

There is a postman collection at this repo you can try it with live version of this api you can try it from
http://sayphr-env.eba-ew3vscsa.eu-west-1.elasticbeanstalk.com/

If you want to change something & make it live you can only write the code & merge it to master. Github action
will take care of `ECR` image creation & `Elastic Beanstalk` deployment.

Notes:

* .env.example settings from my personal AWS resources they could be gone after short period. (1-2 Week)
* Tests & documentations are missing due to lack of time(We got incidents at work while doing this project), If you want we can arrange another time for completing that.
* I don't really know about `ffmpeg` or `video processing`. There may be mistakes, sorry for the misunderstanding. If this is real project I could ask
about how should I proceed with that.
