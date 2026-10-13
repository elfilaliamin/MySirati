import type { Request, Response } from 'express';

import { reorderInputSchema, sectionParamSchema } from './sections.schema.js';
import {
  addItem,
  editItem,
  getItem,
  listItems,
  removeItem,
  reorderItems,
} from './sections.service.js';
import { HTTP_STATUS } from '../constants/http.constants.js';

export async function handleListSectionItems(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const items = await listItems(section, request.user!.id);
  response.status(HTTP_STATUS.OK).json({ items });
}

export async function handleGetSectionItem(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const id = request.params.id as string;
  const item = await getItem(section, request.user!.id, id);
  response.status(HTTP_STATUS.OK).json({ item });
}

export async function handleCreateSectionItem(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const item = await addItem(section, request.user!.id, request.body);
  response.status(HTTP_STATUS.CREATED).json({ item });
}

export async function handleUpdateSectionItem(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const id = request.params.id as string;
  const item = await editItem(section, request.user!.id, id, request.body);
  response.status(HTTP_STATUS.OK).json({ item });
}

export async function handleDeleteSectionItem(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const id = request.params.id as string;
  await removeItem(section, request.user!.id, id);
  response.status(HTTP_STATUS.OK).json({ success: true });
}

export async function handleReorderSectionItems(
  request: Request,
  response: Response
): Promise<void> {
  const section = sectionParamSchema.parse(request.params.section);
  const { itemIds } = reorderInputSchema.parse(request.body);
  await reorderItems(section, request.user!.id, itemIds);
  response.status(HTTP_STATUS.OK).json({ success: true });
}
