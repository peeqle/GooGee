package com.googee.googeeserver.models.media;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash
public class Media implements Serializable {

	@Id
	private String id;

	private String hash;

	private String path;
}
