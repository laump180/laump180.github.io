export const formatTime = (seconds: number): string => seconds.toFixed(1)

export const formatCount = (value: number): string => String(value).padStart(2, '0')
