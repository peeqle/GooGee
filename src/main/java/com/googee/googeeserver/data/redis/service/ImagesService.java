package com.googee.googeeserver.data.redis.service;


import com.googee.googeeserver.models.data.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImagesService {
	private final HashOperations<String, String, Image> hashOperations;
}
