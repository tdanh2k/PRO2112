package com.example.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.example.entity.phpTest;
import com.example.repository.phpRepository;

import lombok.RequiredArgsConstructor;

import com.example.repository.dataTablesRepository;

@Service
@RequiredArgsConstructor
public class phpRepoService {

	private final phpRepository phpRepository;

	private final JdbcTemplate jdbc;

	private final dataTablesRepository dataTablesRepository;

	public List<phpTest> getAll() {
		return phpRepository.findAll();
	}

	public Optional<phpTest> getByID(String ID) throws IllegalArgumentException {
		return phpRepository.findById(ID);
	}

	public phpTest insertOrUpdate(phpTest obj) throws IllegalArgumentException {
		return phpRepository.save(obj);
	}

	public void delete(phpTest requestedObj) throws IllegalArgumentException {
		phpRepository.delete(requestedObj);
	}

	public void deleteAllIn(List<phpTest> requestedList) {
		phpRepository.deleteAll(requestedList);
	}

	// Construct response based on DataTables' JSON request
	@Cacheable(value = "tableRequest")
	public Map<String, Object> tableRequest(JSONObject requestData, boolean selectAll) throws DataAccessException, JSONException {
		String cols = "";
		String search = "";
		String order = "";
		String range = "";
		String SQLQuery = "";

		for (int i = 0; i < requestData.getJSONArray("columns").length(); i++) {
			if (i < requestData.getJSONArray("columns").length()) {
				if (selectAll) {
					// Select all columns
					if (!cols.contains("*")) {
						cols += " * ";
					}
				} else {
					// Add query column if it isn't an action column
					if (!requestData.getJSONArray("columns").getJSONObject(i).getString("data").contains("null")) {
						if (i != 0) {
							cols += ", ";
						} else {
							cols += " ";
						}

						// Construct required column part
						cols += requestData.getJSONArray("columns").getJSONObject(i).getString("data");
					}
				}

				// Add query search constraint
				if (!requestData.getJSONObject("search").getString("value").isBlank()) {
					// Add general search
					if (requestData.getJSONArray("columns").getJSONObject(i).getBoolean("searchable")) {
						// Add conditional word based on its availbility
						if (!requestData.getJSONArray("columns").getJSONObject(i).getString("data").contains("null")) {
							if (i == 0 && !search.contains("WHERE")) {
								search += " WHERE ";
							} else {
								search += " OR ";
							}

							// Construct general search part
							search += requestData.getJSONArray("columns").getJSONObject(i).getString("data") + " LIKE "
							// Search directly without '%%' if regex is allowed
									+ (requestData.getJSONObject("search").getBoolean("regex")
											? requestData.getJSONObject("search").getString("value")
											: "N'%" + requestData.getJSONObject("search").getString("value") + "%'");
						}
					}
				} else {
					// Add query column search
					if (requestData.getJSONArray("columns").getJSONObject(i).getBoolean("searchable")) {
						// Add conditional word based on its availbility
						if (!requestData.getJSONArray("columns").getJSONObject(i).getJSONObject("search")
								.getString("value").isBlank()) {
							if (!search.contains("WHERE")) {
								search += " WHERE ";
							} else {
								search += " AND ";
							}

							// Construct individual column search part
							search += requestData.getJSONArray("columns").getJSONObject(i).getString("data") + " LIKE "
							// Search directly without '%%' if regex is allowed
									+ (requestData.getJSONArray("columns").getJSONObject(i).getJSONObject("search")
											.getBoolean("regex")
													? requestData.getJSONArray("columns").getJSONObject(i)
															.getJSONObject("search").getString("value")
													: "N'%" + requestData.getJSONArray("columns").getJSONObject(i)
															.getJSONObject("search").getString("value") + "%'");
						}
					}
				}
			}

			// Add query order column name and direction
			if (requestData.getJSONArray("columns").getJSONObject(i).getBoolean("orderable")) {
				if (i == requestData.getJSONArray("order").getJSONObject(0).getInt("column")) {
					order += " ORDER BY " + requestData.getJSONArray("columns").getJSONObject(i).getString("data") + " "
							+ requestData.getJSONArray("order").getJSONObject(0).getString("dir").toUpperCase();
				}
			}
		}

		// Add query range
		range += " OFFSET " + requestData.getInt("start") + " ROWS FETCH NEXT " + requestData.getInt("length")
				+ " ROWS ONLY";

		// Construct request query
		SQLQuery = "SELECT " + cols + " FROM phpTest" + search + order + range;

		// Prepare response's params
		long draw = (requestData.getInt("draw") >= 0) ? requestData.getInt("draw") : 0;
		long recordsTotal = phpRepository.count();
		List<Map<String, Object>> data = jdbc.queryForList(SQLQuery);
		long recordsFiltered = search.isBlank() ? recordsTotal : (data != null ? data.size() : 0);

		// Construct response object for DataTables
		Map<String, Object> result = new HashMap<>();
		// Number of draws
		result.put("draw", draw);
		// Total records available in database
		result.put("recordsTotal", recordsTotal);
		// Total records currently requested
		result.put("recordsFiltered", recordsFiltered);
		// Currently Requested data
		result.put("data", data);

		return result;
	}

	public DataTablesOutput<phpTest> list(DataTablesInput input) {
		return dataTablesRepository.findAll(input);
	}

	public long size() {
		return phpRepository.count();
	}
}
