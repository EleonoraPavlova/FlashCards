import {
  Card,
  CardsListResponse,
  CreateCardArgs,
  CreateCardResponse,
  GetCardArgs,
  GetCardsArgs,
  GetRandomCardToLearnArgs,
  GetRandomCardToLearnResponse,
  UpdateCardArgs,
} from '@/services/cards/cards.types'
import {
  CreateDeckArgs,
  CreateDeckResponse,
  DeckResponse,
  DecksListResponse,
  DeleteDeckResponse,
  GetDecksArgs,
} from '@/services/decks/deck.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      addDeckToFavorite: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'POST',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      createCard: builder.mutation<CreateCardResponse, CreateCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ deckId, ...args }) => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${deckId}/cards`,
        }),
      }),
      createDeck: builder.mutation<CreateDeckResponse, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Cards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      deleteDeck: builder.mutation<DeleteDeckResponse, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => {
          return {
            method: 'DELETE',
            url: `/v1/decks/${id}`,
          }
        },
      }),
      getCard: builder.query<Card, GetCardArgs>({
        query: ({ id }) => ({
          method: 'GET',
          url: `v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<CardsListResponse, GetCardsArgs>({
        providesTags: ['Cards'],
        query: ({ deckId, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/decks/${deckId}/cards`,
        }),
      }),
      getDeck: builder.query<DeckResponse, { id: string }>({
        query: ({ id }) => {
          return {
            method: 'GET',
            url: `v1/decks/${id}`,
          }
        },
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => {
          return {
            method: 'GET',
            params: args ?? undefined,
            url: `v2/decks`,
          }
        },
      }),
      getRandomCard: builder.query<GetRandomCardToLearnResponse, GetRandomCardToLearnArgs>({
        query: ({ id, ...args }) => {
          return {
            method: 'GET',
            params: args ?? undefined,
            url: `/v1/decks/${id}/learn`,
          }
        },
      }),
      removeDeckFromFavorite: builder.mutation<void, { id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}/favorite`,
        }),
      }),
      updateCard: builder.mutation<DeleteDeckResponse, UpdateCardArgs>({
        //DeleteDeckResponse the same for card/deck
        invalidatesTags: ['Cards'], // и 'Card'?
        query: ({ id, cover, name, isPrivate }) => {
          const formData = new FormData()
          if (cover) formData.append('cover', cover)
          if (name) formData.append('name', name)
          if (isPrivate !== undefined) formData.append('isPrivate', isPrivate.toString())

          return {
            body: formData,
            method: 'PATCH',
            url: `/v1/decks/${id}`,
          }
        },
      }),
    }
  },
  reducerPath: 'flashcardsApi',
  tagTypes: ['Cards', 'Card', 'Decks'],
})

export const {
  useAddDeckToFavoriteMutation,
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetCardQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetRandomCardQuery,
  useRemoveDeckFromFavoriteMutation,
  useUpdateCardMutation,
} = flashcardsApi
