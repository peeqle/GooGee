package com.googee.googeeserver.models.user;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Document(indexName = "user-search")
@RequiredArgsConstructor
public class AppUserSearchEntity {

	@Id
	private String id;
	@Field(type = FieldType.Text, name = "username")
	private String username;
	@Field(type = FieldType.Text, name = "description")
	private String status;
}
