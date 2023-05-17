package com.googee.googeeserver.data.repo.user;

import com.googee.googeeserver.models.user.AppUserSearchEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserElasticRepository {
	Page<AppUserSearchEntity> findAppUserSearchEntityByUsername(String username, Pageable pageable);

	@Query("{\"bool\": {\"must\": [{\"match\": {\"appUser.username\": \"?0\"}}]}}")
	Page<AppUserSearchEntity> findByAppUsersNameUsingCustomQuery(String username, Pageable pageable);
}
