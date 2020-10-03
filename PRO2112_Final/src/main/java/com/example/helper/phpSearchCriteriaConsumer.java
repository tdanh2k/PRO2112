package com.example.helper;

import java.util.function.Consumer;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.example.entity.SearchCriteria;
import com.example.entity.phpTest;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class phpSearchCriteriaConsumer implements Consumer<SearchCriteria> {

	private Predicate predicate;
	private CriteriaBuilder builder;
	private Root<phpTest> r;

	@Override
	public void accept(SearchCriteria t) {
		String op = t.getOperation();

		if (op.equalsIgnoreCase(">")) {
			predicate = builder.and(predicate,
					builder.greaterThanOrEqualTo(r.get(t.getKey()), t.getValue().toString()));
		} else if (t.getOperation().equalsIgnoreCase("<")) {
			predicate = builder.and(predicate,
					builder.lessThanOrEqualTo(r.get(t.getKey()), t.getValue().toString()));
		} else if (t.getOperation().equalsIgnoreCase(":")) {
			if (r.get(t.getKey()).getJavaType() == String.class) {
				predicate = builder.and(predicate, builder.like(r.get(t.getKey()), "%" + t.getValue() + "%"));
			} else {
				predicate = builder.and(predicate, builder.equal(r.get(t.getKey()), t.getValue()));
			}
		}
	}

}
