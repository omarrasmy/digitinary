export enum PostgresErrorCode {
  UniqueViolation = '23505',
  InvalidForeignKey = '22P02',
  NotNullViolation = '23502',
  CheckViolation = '23514',
  ExclusionViolation = '23P01',
  InvalidTextRepresentation = '22P02',
  ForeignKeyViolation = '23503',
}
