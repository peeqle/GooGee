package com.googee.googeeserver.resource.search;

import com.googee.googeeserver.data.service.search.SearchService;
import com.googee.googeeserver.models.search.SearchElement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchResource {

	private final SearchService searchService;

	@PostMapping
	public ResponseEntity<List<SearchElement>> findByParameters(@RequestParam("query") String query,
																@RequestParam(value = "limit", defaultValue = "30") int limit,
																@RequestParam(value = "offset", defaultValue = "0") int offset) {
		if (query == null || query.isEmpty()) {
			return ResponseEntity.status(NOT_FOUND).build();
		}
		return ResponseEntity.ok(searchService.findByParameters(query, limit, offset));
	}
}
