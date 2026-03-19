import pandas as pd
import os

def fix_ids():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(base_dir, 'dataset.csv')
    
    if os.path.exists(dataset_path):
        # Read the dataset
        df = pd.read_csv(dataset_path)
        
        # Sort by level (just to group them logically if needed) or keep order
        # But user wants them "correctly arranged", usually means sequential IDs
        
        # Reset ID to 1 to N
        df['learner_id'] = range(1, len(df) + 1)
        
        # Save it back
        df.to_csv(dataset_path, index=False)
        print(f"✅ Reset dataset.csv IDs to 1-{len(df)}")
    
    # Do the same for learners_data if needed? No, learners_data doesn't have an ID column
    # ... checks ...
    
if __name__ == "__main__":
    fix_ids()
