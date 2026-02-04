#!/usr/bin/env python3
"""
Parse Winter Olympics schedule text file and convert to JSON.
"""

import json
import re
import sys
from datetime import datetime


def parse_schedule(input_file, output_file):
    """Parse schedule text file and output JSON."""
    
    events = []
    current_date = None
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by date headers first
    # Match lines like "Saturday, February 21"
    date_pattern = r'^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s+(\w+)\s+(\d+)'
    
    lines = content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check for date header
        date_match = re.match(date_pattern, line.strip())
        if date_match:
            month = date_match.group(2)
            day = date_match.group(3)
            current_date = f"{month} {day}, 2026"
            i += 1
            continue
        
        # Check for time entry - handles tabs between time and content
        # Format: "1:00 AM\t\t\"EVENT..."
        time_match = re.match(r'^(\d{1,2}:\d{2}\s*[AP]M)', line.strip())
        if time_match and current_date:
            start_time = time_match.group(1).strip()
            
            # Find the quoted block - it starts with " after the time
            # The content after time may be separated by tabs
            rest_of_line = line[line.find(time_match.group(1)) + len(time_match.group(1)):]
            rest_of_line = rest_of_line.strip('\t ')
            
            event_text = ""
            
            if rest_of_line.startswith('"'):
                # Content starts on this line
                event_text = rest_of_line[1:]  # Remove opening quote
                
                # Check if it ends on this line
                if event_text.endswith('"'):
                    event_text = event_text[:-1]
                else:
                    # Keep reading lines until we find the closing quote
                    i += 1
                    while i < len(lines):
                        next_line = lines[i]
                        # Check if this line ends the quote
                        if next_line.strip().endswith('"'):
                            event_text += '\n' + next_line.strip()[:-1]
                            break
                        else:
                            event_text += '\n' + next_line.strip()
                        i += 1
            
            if event_text:
                event = parse_event_block(event_text, start_time, current_date)
                if event:
                    events.append(event)
        
        i += 1
    
    # Write output JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(events, f, indent=2)
    
    print(f"Parsed {len(events)} events to {output_file}")
    return events


def parse_event_block(event_text, start_time, date):
    """Parse a single event block and extract details."""
    
    lines = event_text.strip().split('\n')
    if not lines:
        return None
    
    # First line contains: SPORT (LIVE/REPLAY) and possibly 🏅
    first_line = lines[0].strip()
    
    # Check for medal event (🏅 emoji)
    is_medal_event = '🏅' in first_line
    first_line = first_line.replace('🏅', '').strip()
    
    # Extract LIVE or REPLAY status
    is_live = False
    is_replay = False
    
    live_match = re.search(r'\(LIVE\)', first_line, re.IGNORECASE)
    replay_match = re.search(r'\(REPLAY\)', first_line, re.IGNORECASE)
    
    if live_match:
        is_live = True
        sport = first_line[:live_match.start()].strip()
    elif replay_match:
        is_replay = True
        sport = first_line[:replay_match.start()].strip()
    else:
        sport = first_line
    
    # Clean up sport name (remove trailing colon and team names for hockey/curling)
    sport = re.sub(r':.*$', '', sport).strip()
    
    # Second line is the event description
    event_description = lines[1].strip() if len(lines) > 1 else ""
    
    # Last line is the broadcaster(s)
    broadcaster = lines[-1].strip() if len(lines) > 1 else ""
    # If event_description and broadcaster are the same (only 2 lines), keep both
    if len(lines) == 2:
        # The second line is the broadcaster
        broadcaster = lines[1].strip()
        event_description = ""
    elif len(lines) >= 3:
        broadcaster = lines[-1].strip()
        # Event description is everything between first and last line
        event_description = ' '.join(line.strip() for line in lines[1:-1])
    
    return {
        "date": date,
        "start_time": start_time,
        "sport": sport,
        "event": event_description,
        "is_live": is_live,
        "is_replay": is_replay,
        "is_medal_event": is_medal_event,
        "broadcaster": broadcaster
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python parse_schedule.py <input_file> [output_file]")
        print("  input_file: Path to the text file with schedule data")
        print("  output_file: Path for JSON output (default: schedule_output.json)")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "schedule_output.json"
    
    parse_schedule(input_file, output_file)
