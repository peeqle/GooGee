package com.googee.googeeserver.models.data;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("image")
@AllArgsConstructor
@RequiredArgsConstructor
public class Image implements Serializable {

	@Id
	private String id;

	private String path;

	private long size;
}
