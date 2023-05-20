package com.googee.googeeserver.resource.image;

import com.googee.googeeserver.data.service.KeyStorage;
import com.googee.googeeserver.models.media.Media;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@Log4j2
@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class MediaResource {

	private final HashOperations<String, String, String> mediaLocation;

	@Value("${files.media}")
	private String defaultMediaLocation;

	@GetMapping("/fetch")
	public ResponseEntity<Resource> fetchMedia(@RequestParam("mediaKey") String mediaKey) {
		String location = mediaLocation.get(KeyStorage.MEDIA.getTag(), mediaKey);
		if (location != null) {
			Resource file = storageService.loadAsResource(filename);
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/save")
	public void saveMedia(@RequestBody MultipartFile mediaFile) {
		Media media = new Media();
		File directoryFile = new File(defaultMediaLocation);
		if (!mediaFile.isEmpty()) {
			MessageDigest md = null;
			try {
				md = MessageDigest.getInstance("MD5");
				try (InputStream is = mediaFile.getInputStream()) {
					DigestInputStream dis = new DigestInputStream(is, md);
				}
				byte[] digest = md.digest();
				if (digest != null) {
					media.setHash(Arrays.toString(digest));

					copy(directoryFile, )
				}
			} catch (NoSuchAlgorithmException e) {
				throw new RuntimeException(e);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
