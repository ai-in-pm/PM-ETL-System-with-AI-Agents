import { toast } from '@/hooks/use-toast';

export interface StorageState {
  vectorData?: any[];
  users?: any[];
  settings?: any;
  etlJobs?: any[];
  connections?: any[];
}

export class StorageManager {
  private static instance: StorageManager;
  private undoStack: StorageState[] = [];
  private redoStack: StorageState[] = [];

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  saveState(state: StorageState) {
    try {
      // Push current state to undo stack before saving
      const currentState = this.loadState();
      if (currentState) {
        this.undoStack.push(currentState);
      }

      // Clear redo stack when new changes are made
      this.redoStack = [];

      // Save new state
      localStorage.setItem('etl_hub_state', JSON.stringify(state));
      
      toast({
        title: "Changes Saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  }

  loadState(): StorageState | null {
    try {
      const state = localStorage.getItem('etl_hub_state');
      return state ? JSON.parse(state) : null;
    } catch (error) {
      toast({
        title: "Load Failed",
        description: "Failed to load saved data.",
        variant: "destructive",
      });
      return null;
    }
  }

  undo(): StorageState | null {
    if (this.undoStack.length === 0) {
      toast({
        title: "Nothing to Undo",
        description: "No previous changes found.",
      });
      return null;
    }

    try {
      // Get current state before undo
      const currentState = this.loadState();
      if (currentState) {
        this.redoStack.push(currentState);
      }

      // Pop and apply previous state
      const previousState = this.undoStack.pop()!;
      localStorage.setItem('etl_hub_state', JSON.stringify(previousState));
      
      toast({
        title: "Undo Successful",
        description: "Previous change has been restored.",
      });

      return previousState;
    } catch (error) {
      toast({
        title: "Undo Failed",
        description: "Failed to undo last change.",
        variant: "destructive",
      });
      return null;
    }
  }

  redo(): StorageState | null {
    if (this.redoStack.length === 0) {
      toast({
        title: "Nothing to Redo",
        description: "No changes to redo.",
      });
      return null;
    }

    try {
      // Get current state before redo
      const currentState = this.loadState();
      if (currentState) {
        this.undoStack.push(currentState);
      }

      // Pop and apply next state
      const nextState = this.redoStack.pop()!;
      localStorage.setItem('etl_hub_state', JSON.stringify(nextState));
      
      toast({
        title: "Redo Successful",
        description: "Change has been reapplied.",
      });

      return nextState;
    } catch (error) {
      toast({
        title: "Redo Failed",
        description: "Failed to redo change.",
        variant: "destructive",
      });
      return null;
    }
  }

  clearHistory() {
    this.undoStack = [];
    this.redoStack = [];
  }
}

export const storageManager = StorageManager.getInstance();