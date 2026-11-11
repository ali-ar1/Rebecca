// Host-level VLESS encryption override (client side "encryption" value, e.g.
// mlkem768x25519plus.native.0rtt.<key>). Empty or "none" inherits the inbound value.

export const VLESS_ENCRYPTION_MAX_LENGTH = 8192;

export const normalizeVlessEncryption = (
	value: string | null | undefined,
): string => {
	const trimmed = (value ?? "").trim();
	return trimmed.toLowerCase() === "none" ? "" : trimmed;
};

export const vlessEncryptionValid = (
	value: string | null | undefined,
): boolean => {
	const normalized = normalizeVlessEncryption(value);
	if (!normalized) return true;
	if (normalized.length > VLESS_ENCRYPTION_MAX_LENGTH) return false;
	for (const char of normalized) {
		const code = char.charCodeAt(0);
		if (code <= 0x20 || code === 0x7f || char === "&" || char === "#" || char === "?") {
			return false;
		}
	}
	return true;
};
