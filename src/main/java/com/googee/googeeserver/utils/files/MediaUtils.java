package com.googee.googeeserver.utils.files;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MediaUtils {

	public static String generateFileFingerprint(byte[] fileBytes) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		byte[] hashBytes = md.digest(fileBytes);

		StringBuilder sb = new StringBuilder();
		for (byte b : hashBytes) {
			sb.append(String.format("%02x", b));
		}
		return sb.toString();
	}
}
