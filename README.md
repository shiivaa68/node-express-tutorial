## Assigment

crud = creat,read,update,delete
for testing use postman or insomnia

build a restful web api to manage lessons and channels .a channel is a group chat channel that brings toghether an instructor and a group of students from the same cohort as they work on a lesson
a 'lesson' has :
a uniqe 'id',
a 'name'
a channel has :
a uniqe 'id'
a 'name'
a 'lesson 'id'' that connect it to the corresponding lesson
a 'cohort'

# TODO:

- Separate, Service layer (Database calls), Controller Layer (req, res and returns reuslt to user), routers (routes every request to related controller)
- DTO
- convert to typescript, by initiating a tsc init
- entity -> create an interface or type
- express use res, res but typed
- you should be able to get url params, req.body and url search queores in a typed version
- create a branch and use sequelize instead of knex
