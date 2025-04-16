export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alliances: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      battle_logs: {
        Row: {
          battle_id: string | null
          created_at: string | null
          id: string
          log_data: Json
          round: number
        }
        Insert: {
          battle_id?: string | null
          created_at?: string | null
          id?: string
          log_data: Json
          round: number
        }
        Update: {
          battle_id?: string | null
          created_at?: string | null
          id?: string
          log_data?: Json
          round?: number
        }
        Relationships: [
          {
            foreignKeyName: "battle_logs_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
        ]
      }
      battles: {
        Row: {
          attacker_kingdom_id: string | null
          attacker_units: Json
          completed_at: string | null
          created_at: string | null
          defender_kingdom_id: string | null
          defender_units: Json | null
          id: string
          result: Json | null
          started_at: string | null
          status: string
        }
        Insert: {
          attacker_kingdom_id?: string | null
          attacker_units: Json
          completed_at?: string | null
          created_at?: string | null
          defender_kingdom_id?: string | null
          defender_units?: Json | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
        }
        Update: {
          attacker_kingdom_id?: string | null
          attacker_units?: Json
          completed_at?: string | null
          created_at?: string | null
          defender_kingdom_id?: string | null
          defender_units?: Json | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "battles_attacker_kingdom_id_fkey"
            columns: ["attacker_kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battles_defender_kingdom_id_fkey"
            columns: ["defender_kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
      buildings: {
        Row: {
          completed: boolean
          completion_time: string | null
          created_at: string
          id: string
          kingdom_id: string
          level: number
          name: string
          type: string
        }
        Insert: {
          completed?: boolean
          completion_time?: string | null
          created_at?: string
          id?: string
          kingdom_id: string
          level?: number
          name: string
          type: string
        }
        Update: {
          completed?: boolean
          completion_time?: string | null
          created_at?: string
          id?: string
          kingdom_id?: string
          level?: number
          name?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "buildings_kingdom_id_fkey"
            columns: ["kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
      game_logs: {
        Row: {
          id: string
          kingdom_id: string
          message: string
          timestamp: string
          type: string
        }
        Insert: {
          id?: string
          kingdom_id: string
          message: string
          timestamp?: string
          type: string
        }
        Update: {
          id?: string
          kingdom_id?: string
          message?: string
          timestamp?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_logs_kingdom_id_fkey"
            columns: ["kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
      kingdom_alliances: {
        Row: {
          alliance_id: string
          joined_at: string | null
          kingdom_id: string
          role: string
        }
        Insert: {
          alliance_id: string
          joined_at?: string | null
          kingdom_id: string
          role?: string
        }
        Update: {
          alliance_id?: string
          joined_at?: string | null
          kingdom_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "kingdom_alliances_alliance_id_fkey"
            columns: ["alliance_id"]
            isOneToOne: false
            referencedRelation: "alliances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kingdom_alliances_kingdom_id_fkey"
            columns: ["kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
      kingdoms: {
        Row: {
          age: number
          created_at: string
          id: string
          last_updated: string
          name: string
          profile_id: string
          ruler: string
        }
        Insert: {
          age?: number
          created_at?: string
          id?: string
          last_updated?: string
          name: string
          profile_id: string
          ruler: string
        }
        Update: {
          age?: number
          created_at?: string
          id?: string
          last_updated?: string
          name?: string
          profile_id?: string
          ruler?: string
        }
        Relationships: [
          {
            foreignKeyName: "kingdoms_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          last_login: string | null
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          last_login?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          last_login?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          farmers: number
          food: number
          gold: number
          kingdom_id: string
          land: number
          miners: number
          population: number
          scholars: number
          soldiers: number
          stone: number
          wood: number
        }
        Insert: {
          farmers?: number
          food?: number
          gold?: number
          kingdom_id: string
          land?: number
          miners?: number
          population?: number
          scholars?: number
          soldiers?: number
          stone?: number
          wood?: number
        }
        Update: {
          farmers?: number
          food?: number
          gold?: number
          kingdom_id?: string
          land?: number
          miners?: number
          population?: number
          scholars?: number
          soldiers?: number
          stone?: number
          wood?: number
        }
        Relationships: [
          {
            foreignKeyName: "resources_kingdom_id_fkey"
            columns: ["kingdom_id"]
            isOneToOne: true
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
      trade_offers: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          offer_resources: Json
          receiver_kingdom_id: string | null
          request_resources: Json
          sender_kingdom_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          offer_resources: Json
          receiver_kingdom_id?: string | null
          request_resources: Json
          sender_kingdom_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          offer_resources?: Json
          receiver_kingdom_id?: string | null
          request_resources?: Json
          sender_kingdom_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trade_offers_receiver_kingdom_id_fkey"
            columns: ["receiver_kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trade_offers_sender_kingdom_id_fkey"
            columns: ["sender_kingdom_id"]
            isOneToOne: false
            referencedRelation: "kingdoms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
