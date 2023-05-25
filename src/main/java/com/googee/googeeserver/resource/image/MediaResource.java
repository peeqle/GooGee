package com.googee.googeeserver.resource.image;

import com.googee.googeeserver.data.service.KeyStorage;
import com.googee.googeeserver.models.media.Media;
import com.googee.googeeserver.utils.files.MediaUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
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
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import static org.apache.commons.io.FileUtils.copyFile;

@Log4j2
@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class MediaResource {

	private final HashOperations<String, String, Media> mediaLocation;

	@Value("${files.media}")
	private String defaultMediaLocation;

	@GetMapping("/fetch")
	public ResponseEntity<Resource> fetchMedia(@RequestParam("mediaKey") String mediaKey) {
		Media media = mediaLocation.get(KeyStorage.MEDIA.getTag(), mediaKey);
		if (media != null) {
			Resource file = new ClassPathResource(media.getPath());
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping("/save")
	public void saveMedia(@RequestBody MultipartFile mediaFile) {
		Media media = new Media();
		if (!mediaFile.isEmpty()) {
			try {
				String hash = MediaUtils.generateFileFingerprint(mediaFile.getBytes());

				media.setHash(hash);
				Path path = Paths.get(defaultMediaLocation + mediaFile.getOriginalFilename());
				Files.write(path, mediaFile.getBytes());

				mediaLocation.put(KeyStorage.MEDIA.getTag(), hash, media);
			} catch (NoSuchAlgorithmException e) {
				throw new RuntimeException(e);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
