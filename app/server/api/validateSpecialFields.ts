/**
 * Validates special fields for JSA documents
 * Returns error message if validation fails, null if valid
 */
export function validateSpecialFields(special: any): string | null {
  if (!special) return null;

  // Hot Work validation
  if (special.hotWork?.permitRequired) {
    if (typeof special.hotWork.fireWatchMins !== "number") {
      return "Hot Work: Fire watch duration (minutes) is required when permit is required.";
    }
    if (special.hotWork.fireWatchMins < 0) {
      return "Hot Work: Fire watch duration must be a positive number.";
    }
  }

  // LOTO validation
  if (special.loto?.required) {
    if (special.loto.zeroVerified !== "Yes") {
      return "LOTO: Zero Energy must be verified (set to 'Yes') before work can proceed.";
    }
  }

  // Crane/Lift validation
  if (special.craneLift?.planRequired) {
    if (special.craneLift.qualified !== "Yes") {
      return "Crane/Lift: Rigger/Signaler must be qualified (set to 'Yes') for lift plan.";
    }
  }

  // Traffic Control validation
  if (special.trafficControl?.tcpRequired) {
    if (!special.trafficControl.flaggers) {
      return "Traffic Control: Flagger assignment must be specified (Yes/No/As Needed).";
    }
  }

  // Confined Space validation
  if (special.confinedSpace?.requiresPermit) {
    if (!special.confinedSpace.rescuePlanVerified) {
      return "Confined Space: Rescue plan must be verified before entry.";
    }
    
    if (special.confinedSpace.atmosphericMonitoring?.required) {
      const monitoring = special.confinedSpace.atmosphericMonitoring;
      
      if (!monitoring.gases || monitoring.gases.length === 0) {
        return "Confined Space: At least one gas must be monitored.";
      }
      
      if (monitoring.readings) {
        // If O2 readings exist, validate range
        if (monitoring.readings.O2) {
          const o2Value = parseFloat(monitoring.readings.O2);
          if (!isNaN(o2Value) && (o2Value < 19.5 || o2Value > 23.5)) {
            return "Confined Space: O2 reading out of acceptable range (19.5%-23.5%). Entry not permitted.";
          }
        }
        
        // If LEL readings exist, validate
        if (monitoring.readings.LEL) {
          const lelValue = parseFloat(monitoring.readings.LEL);
          if (!isNaN(lelValue) && lelValue >= 10) {
            return "Confined Space: LEL reading ≥10%. Entry not permitted.";
          }
        }
      }
    }
  }

  return null;
}

/**
 * Express middleware to validate special fields
 * Use in routes like: app.post('/api/jsas', validateSpecialFieldsMiddleware, handler)
 */
export function validateSpecialFieldsMiddleware(req: any, res: any, next: any) {
  const error = validateSpecialFields(req.body.special);
  if (error) {
    return res.status(400).json({ error });
  }
  next();
}
