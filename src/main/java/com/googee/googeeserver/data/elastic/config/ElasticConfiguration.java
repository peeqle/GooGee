package com.googee.googeeserver.data.elastic.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories
public class ElasticConfiguration {

	@Value("${elastic.username}")
	private String elasticUsername;

	@Value("${elastic.password}")
	private String elasticPassword;

}
