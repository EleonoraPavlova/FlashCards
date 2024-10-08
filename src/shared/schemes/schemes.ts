import { z } from 'zod'

export const nameScheme = z
  .string()
  .min(3, "Name length can't be less than 3 characters")
  .max(30, "Name length can't be more than 30 characters")

export const emailSchema = z
  .string()
  .email('Please enter a valid email address.')
  .min(5, 'Email must be at least 5 characters long.')
  .toLowerCase()

export const passwordSchema = z
  .string()
  .regex(/^\S*$/, 'Whitespace characters are not allowed.')
  .min(3, "Password length can't be less than 3 characters")
  .max(30, "Password length can't be more than 30 characters")

export const rememberMeSchema = z.boolean().optional().default(false)
export const entityIdScheme = z.string().default('')

export const nicknameScheme = z
  .string()
  .regex(/^[^!@#$%^&*(),.?":{}|<>]*$/, "Please don't use special characters in the nickname.")
  .trim()
export const radioScheme = z.string()

export const deckNameScheme = z
  .string()
  .trim()
  .min(3, "Deck Name length can't be less than 3 characters.")
  .max(30, "Deck Name length can't be more than 30 characters.")

export const privateDeckScheme = z.boolean().optional().default(false)

export const cardAnswerScheme = z
  .string()
  .trim()
  .min(3, "Answer length can't be less than 3 characters.")
  .max(500, "Answer length can't be more than 30 characters.")
export const cardQuestionScheme = z
  .string()
  .trim()
  .min(3, "Question length can't be less than 3 characters.")
  .max(500, "Question length can't be more than 30 characters.")

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const codeVerifySchema = z.string().regex(uuidRegex, {
  message: 'Invalid verification code format. Please enter the correct code.',
})
