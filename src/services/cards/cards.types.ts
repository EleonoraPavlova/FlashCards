import { DeckId } from '@/services/decks'
import { Nullable } from '@/shared/types/common'

export type Card = {
  answer: string
  answerImg?: Nullable<string>
  answerVideo?: Nullable<string>
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: Nullable<string>
  questionVideo?: Nullable<string>
  shots: number
  updated: string
  userId: string
}

export type CardId = Pick<Card, 'id'>

export type CardsListResponse = {
  items: Card[]
  pagination: PaginationModel
}

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  deckId: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type GetCardArgs = {
  id: string
}

export type CreateCardResponse = Card

export type CreateCardArgs = {
  answer?: string
  answerImg?: Nullable<File>
  answerVideo?: string
  deckId: string
  question?: string
  questionImg?: Nullable<File>
  questionVideo?: string
}

export type UpdateCardResponse = Omit<Card, 'grade'>

export type UpdateCardArgs = GetCardArgs & Partial<CreateCardArgs>

export type GetRandomCardToLearnResponse = Omit<Card, 'userId'>

export type GetRandomCardToLearnArgs = {
  id: string
  previousCard?: string
}

export type PaginationModel = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Grade = {
  grade: string
}

export type SaveGradeArgs = {
  cardId: string
  grade: number
} & DeckId
