package com.googee.googeeserver.models.request;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AuthenticationResponse extends Response {

	private String accessToken;

	private String refreshToken;

	@Override
	public void setSuccess(boolean success) {
		super.setSuccess(success);
	}

	public AuthenticationResponse buildSuccess(boolean success) {
		this.setSuccess(success);
		return this;
	}

	@Override
	public void setTransactionTime(long transactionTime) {
		super.setTransactionTime(transactionTime);
	}

	public AuthenticationResponse buildTransactionTime(long transactionTime) {
		this.setTransactionTime(transactionTime);
		return this;
	}
}

