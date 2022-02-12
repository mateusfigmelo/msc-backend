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
import WebinarService from "../services";
import ImageService from "../../util/image.handler";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} New webinar document
 */
export const insertWebinar = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "webinar-flyers";
	const webinarFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	request.body.imageUrl = webinarFlyerPath;
	await WebinarService.insertWebinar(request.body)
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Webinar document for relevent ID
 */
export const getWebinarById = async (request: Request, response: Response, next: NextFunction) => {
	const webinarId = request.params.webinarId;
	if (webinarId) {
		await WebinarService.fetchWebinarById(request.params.webinarId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("WebinarId not found");
	}
};
/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Get all webinars in the system
 */
export const getWebinars = async (request: Request, response: Response, next: NextFunction) => {
	await WebinarService.fetchWebinars()
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar[]} Get past webinars
 */
export const getPastWebinars = async (request: Request, response: Response, next: NextFunction) => {
	await WebinarService.fetchPastWebinars()
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Get upcoming webinar document
 */
export const getUpcomingWebinar = async (request: Request, response: Response, next: NextFunction) => {
	await WebinarService.fetchUpcomingWebinar()
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
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Updated webinar document
 */
export const updateWebinar = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "webinar-flyers";

		const webinarFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imageUrl = webinarFlyerPath;
	}

	const webinarId = request.params.webinarId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;

	if (webinarId) {
		await WebinarService.updateWebinar(webinarId, request.body, updatedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("WebinarId not found");
	}
};
/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IWebinar} Deleted webinar document
 */
export const deleteWebinar = async (request: Request, response: Response, next: NextFunction) => {
	const webinarId = request.params.webinarId;
	const deletedBy = request.user && request.user._id ? request.user._id : null;

	if (webinarId) {
		await WebinarService.removeWebinar(request.params.webinarId, deletedBy)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("WebinarId not found");
	}
};

export const webinarsForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await WebinarService.getAllWebinarsForAdmin()
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const deletedWebinarsForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await WebinarService.getDeletedWebinarsForAdmin()
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const recoverRemovedWebinar = async (request: Request, response: Response, next: NextFunction) => {
	const webinarId = request.params.webinarId;
	if (webinarId) {
		await WebinarService.recoverDeletedWebinar(webinarId)
			.then((data: any) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("WebinarId not found");
	}
};

/**
 delete an webinar in the system
 * @param webinarId @type string
 */
export const deleteWebinarPermanently = async (request: Request, response: Response, next: NextFunction) => {
	const webinarId = request.params.webinarId;
	if (webinarId) {
		await WebinarService.deleteWebinarPermanently(webinarId)
			.then((data: any) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error: any) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("WebinarId not found");
	}
};
