package com.googee.googeeserver.config.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sample")
public class SampleController {

	private final NotificationController notificationController;

	@GetMapping
	public void sad() {
		this.notificationController.sendGlobal();
	}
}
