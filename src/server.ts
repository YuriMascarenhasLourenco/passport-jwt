import express from 'express'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'
import passport from 'passport'
import { router } from './routes'
import { errorHandler } from './controllers/errorHandler'

const server= express()
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({extended:true}))
server.use(express.static(path.join(__dirname,'./public')))
server.use(helmet())

server.use(passport.initialize())
server.use(errorHandler)
server.use(router)
