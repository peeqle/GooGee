package com.googee.googeeserver.utils.log;

import com.googee.googeeserver.config.security.service.SecurityContextService;
import com.googee.googeeserver.data.redis.HashNamespaces;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class LogService {

	private final HashOperations<String, Long, String> loggerHashOps;
	private static final String unknownIssuerName = "UNKNOWN";

	public void saveLogMessage(String message, Throwable e) {
		log.warn(message, e);

		LoggerMessage loggerMessage = LoggerMessage.builder()
			.message(message)
			.exceptionType(LoggerIssuerExceptionType.INTERNAL)
			.issuer(unknownIssuerName)
			.thrownAt(Instant.now().toEpochMilli())
			.build();
		loggerHashOps.put(HashNamespaces.LOGGER_HASH.getName(), loggerMessage.getId(), loggerMessage.toString());
	}
	public void saveLogMessage(String message, String issuer, Throwable e) {
		log.warn(message, e);

		LoggerMessage loggerMessage = LoggerMessage.builder()
			.message(message)
			.exceptionType(LoggerIssuerExceptionType.INTERNAL)
			.issuer(issuer)
			.thrownAt(Instant.now().toEpochMilli())
			.build();
		loggerHashOps.put(HashNamespaces.LOGGER_HASH.getName(), loggerMessage.getId(), loggerMessage.toString());
	}


	@Builder
	@RedisHash("logger")
	private record LoggerMessage(
		@Id
		Long id,
		String message,
		Long thrownAt,
		String issuer,
		LoggerIssuerExceptionType exceptionType
	) implements Serializable {
		public Long getId() {
			return this.id;
		}
	}

	private enum LoggerIssuerExceptionType {
		USER,
		TOKEN,
		INTERNAL
	}
}
