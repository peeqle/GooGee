package com.googee.googeeserver.data.service.search;

import com.googee.googeeserver.data.service.user.GeolocationService;
import com.googee.googeeserver.models.search.SearchElement;
import com.googee.googeeserver.models.user.AppUser;
import com.googee.googeeserver.models.user.geo.Geolocation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class SearchService {

	private final MongoTemplate mongoTemplate;

	private final GeolocationService geolocationService;

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

	public List<SearchElement> findNearestUsers(int limit, int offset, AppUser appUser) {
		Geolocation geolocationCoordinates = geolocationService.fetchUserLocation(appUser.getUsername());
		Point point = new Point(geolocationCoordinates.getCoords().getLocation().getX(), geolocationCoordinates.getCoords().getLocation().getY());

		NearQuery nearQuery = NearQuery.near(point, Metrics.KILOMETERS)
			.maxDistance(appUser.getAppUserAdditionalInfo().getMaxEventDistance() / 1000.0);
		Pageable pageable = PageRequest.of(offset, limit);
		nearQuery.with(pageable);

		List<Geolocation> geoResults = mongoTemplate.geoNear(nearQuery, Geolocation.class).getContent().stream().map(GeoResult::getContent).toList();

		return geoResults.stream().map(element -> fetchByUsername(element.getUsername())).toList();
	}

	public void saveSearchElement(String elementQuery, String refId, SearchElementType elementType) {
		SearchElement searchElement = SearchElement.builder()
			.refId(refId)
			.elementQuery(elementQuery)
			.elementType(elementType)
			.build();
		mongoTemplate.save(searchElement);
	}

	private SearchElement fetchByUsername(String username) {
		Query executive = Query.query(new Criteria().andOperator(
			Criteria.where("elementQuery").is(username),
			Criteria.where("elementType").is("USER")
		));

		return mongoTemplate.findOne(executive, SearchElement.class);
	}
}
