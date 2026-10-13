import { Router } from 'express';

import {
  handleCreateSectionItem,
  handleDeleteSectionItem,
  handleGetSectionItem,
  handleListSectionItems,
  handleReorderSectionItems,
  handleUpdateSectionItem,
} from './sections.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';

export const sectionsRouter = Router();

sectionsRouter.use(requireAuth);

sectionsRouter.get('/:section', asyncHandler(handleListSectionItems));
sectionsRouter.post('/:section', asyncHandler(handleCreateSectionItem));
sectionsRouter.patch('/:section/reorder', asyncHandler(handleReorderSectionItems));
sectionsRouter.get('/:section/:id', asyncHandler(handleGetSectionItem));
sectionsRouter.put('/:section/:id', asyncHandler(handleUpdateSectionItem));
sectionsRouter.delete('/:section/:id', asyncHandler(handleDeleteSectionItem));
