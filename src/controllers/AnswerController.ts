import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    async execute(request: Request, response: Response) {
        console.log(request.params);
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRespository = getCustomRepository(SurveyUsersRepository);

        const surveyUser = await surveysUsersRespository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("Survey User dows not exists");
        }

        surveyUser.value = Number(value);

        await surveysUsersRespository.save(surveyUser);

        return response.status(201).json(surveyUser);

    }
}

export { AnswerController }