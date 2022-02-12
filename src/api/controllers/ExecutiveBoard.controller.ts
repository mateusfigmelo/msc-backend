/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import { Request, Response, NextFunction } from "express";
import ExecutiveBoardService from "../services";
import ImageService from "../../util/image.handler";

/**
 * @param request
 * @param response
 * @param next
 * @returns void
 */
export const insertExecutiveBoard = async (request: Request, response: Response, next: NextFunction) => {
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	await ExecutiveBoardService.insertExecutiveBoard(request.body)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
/**
 * @param request
 * @param response
 * @param next
 * @returns DocumentDefinition<IExecutiveBoard>
 */
export const getExecutiveBoardbyID = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	if (executiveBoardId) {
		await ExecutiveBoardService.getExecutiveBoardbyID(request.params.executiveBoardId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns [DocumentDefinition<IExecutiveBoard>]
 */
export const getExecutiveBoard = async (request: Request, response: Response, next: NextFunction) => {
	await ExecutiveBoardService.getExecutiveBoard()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
/**
 * @param request
 * @param response
 * @param next
 * @returns new Board member
 */
export const addBoardMember = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "boardmember-flyers";

		const boardMemberFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imageUrl = boardMemberFlyerPath;
	}
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	const executiveBoardId = request.params.executiveBoardId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;
	if (executiveBoardId) {
		await ExecutiveBoardService.addBoardMember(request.params.executiveBoardId, request.body, updatedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive Board Id not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns updated ExecutiveBoard member
 */
export const updateExecutiveBoardDetails = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;

	if (executiveBoardId) {
		await ExecutiveBoardService.updateExecutiveBoardDetails(request.params.executiveBoardId, request.body, updatedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
/**
 * @param request
 * @param response
 * @param next
 * @returns deleted ExecutiveBoard member
 */
export const deleteExecutiveBoardDetails = async (request: Request, response: Response, next: NextFunction) => {
	const executiveBoardId = request.params.executiveBoardId;
	const deletedBy = request.user && request.user._id ? request.user._id : null;

	if (executiveBoardId) {
		await ExecutiveBoardService.deleteExecutiveBoardDetails(request.params.executiveBoardId, deletedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Executive board ID not found");
	}
};
