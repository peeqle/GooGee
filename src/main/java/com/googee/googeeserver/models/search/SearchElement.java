package com.googee.googeeserver.models.search;

import com.googee.googeeserver.data.service.search.SearchElementType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Builder
@Document
public class SearchElement implements Serializable {
	@Id
	private String id;

	private String elementQuery;

	private String refId;

	private SearchElementType elementType;
}
