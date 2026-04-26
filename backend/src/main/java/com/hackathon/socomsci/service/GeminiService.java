
package com.hackathon.socomsci.service;

import com.hackathon.socomsci.model.*;
import com.hackathon.socomsci.repository.*;
import java.util.Map;

public interface GeminiService {

    Map<String, Object> classifyAndScoreUrgency(String concern);

    String generateTriageReply(String patientMessage);

    /** Structured triage summary from a guided Q&A transcript (JSON fields for the UI). */
    Map<String, Object> generateTriageSummary(String transcript);
}