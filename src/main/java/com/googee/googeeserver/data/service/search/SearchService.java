package com.googee.googeeserver.data.service.search;

import com.googee.googeeserver.models.search.SearchElement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class SearchService {

	private final MongoTemplate mongoTemplate;

	public List<SearchElement> findByParameters(String query, int limit, int offset, String username) {
		Query executive = Query.query(
			new Criteria().andOperator(
				Criteria.where("elementQuery").ne(username),
				Criteria.where("elementQuery").regex("(?i)^.*" + query + ".*$")
			)
		);
		Pageable pageable = PageRequest.of(offset, limit);
		executive.with(pageable);

		return mongoTemplate.find(executive, SearchElement.class);
	}

	public void saveSearchElement(String elementQuery, String refId, SearchElementType elementType) {
		SearchElement searchElement = SearchElement.builder()
			.refId(refId)
			.elementQuery(elementQuery)
			.elementType(elementType)
			.build();
		mongoTemplate.save(searchElement);
	}
}
